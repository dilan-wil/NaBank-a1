"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/context/auth-context";
import { useCustomerStore } from "@/lib/store";
import { toast } from "sonner";
import { CustomerForm } from "@/lib/type";
import { Progress } from "@/components/ui/progress";
import { RenderRegistrationStep } from "@/components/auth/render-registration-step";
import { useRouter } from "next/navigation";
import { customerApi } from "@/lib/api";
interface ValidationErrors {
  [key: string]: string;
}

export default function SignupPage() {
  const [password, setPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register } = useAuth();
  const router = useRouter();
  const { setCustomer } = useCustomerStore();
  const [loading, setLoading] = useState(false);
  const totalSteps = 4;
  const [currentStep, setCurrentStep] = useState(1);
  const progress = (currentStep / totalSteps) * 100;
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [formData, setFormData] = useState<CustomerForm>({
    id: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    region: "",
    postalCode: "",
    birthdate: "",
    idType: "",
    mobilePhoneNumber: "",
    alternatePhoneNumber: "",
    emailAddress: "",
    customerSource: "",
    status: "VALID",
    customerType: "INDIVIDUAL",
    appProductId: process.env.NEXT_PUBLIC_MANSAR_API_ID!,
    nui: "",
    nationality: "",
    revenusRange: "",
    cniNumber: "",
    gender: "",
  });

  const validateStep = (step: number): boolean => {
    const newErrors: ValidationErrors = {};

    switch (step) {
      case 1:
        if (!formData.firstName.trim())
          newErrors.firstName = "First name is required";
        if (!formData.lastName.trim())
          newErrors.lastName = "Last name is required";
        if (!formData.birthdate)
          newErrors.dateOfBirth = "Date of birth is required";
        else {
          const age =
            new Date().getFullYear() -
            new Date(formData.birthdate).getFullYear();
          if (age < 18)
            newErrors.dateOfBirth = "You must be at least 18 years old";
        }
        if (!formData.gender) newErrors.gender = "Gender is required";
        break;

      case 2:
        if (!formData.address.trim()) newErrors.address = "Address is required";
        // if (!formData.latitude || !formData.longitude) {
        //   newErrors.address =
        //     "Please select a valid address from the suggestions";
        // }
        break;

      case 3:
        if (!formData.idType) newErrors.idType = "ID Type is required";

        if (!formData.cniNumber.trim())
          newErrors.niuNumber = "CNI number is required";
        if (formData.cniNumber.length < 8)
          newErrors.cniNumber = "CNI number must be at least 8 characters";

        if (!formData.nui.trim())
          newErrors.niuNumber = "NIU number is required";
        if (formData.nui.length < 8)
          newErrors.niuNumber = "NIU number must be at least 8 characters";
        break;

      case 4:
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.emailAddress.trim())
          newErrors.email = "Email is required";
        else if (!emailRegex.test(formData.emailAddress))
          newErrors.email = "Please enter a valid email address";

        const phoneRegex = /^6[0-9]{8}$/;
        if (!formData.mobilePhoneNumber.trim())
          newErrors.phone = "Phone number is required";
        else if (!phoneRegex.test(formData.mobilePhoneNumber)) {
          newErrors.phone =
            "Phone number must start with 6 and be 9 digits total";
        }

        if (!password) newErrors.password = "Password is required";
        else if (password.length < 8)
          newErrors.password = "Password must be at least 8 characters";

        if (!confirmPassword)
          newErrors.confirmPassword = "Please confirm your password";
        else if (password !== confirmPassword) {
          newErrors.confirmPassword = "Passwords do not match";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // console.log(formData);
    if (password !== confirmPassword) {
      toast.error("Passwords are different");
      return;
    }
    try {
      const customer = await customerApi.create({
        ...formData,
      });

      const response = await register(
        formData.emailAddress,
        formData.mobilePhoneNumber,
        password,
        { role: "personal", mansarID: customer.id }
      );

      // console.log(response);

      setCustomer(customer);

      if (!response.data.session) {
        router.push("/auth/login");
      }

      router.push("/personal/dashboard");
      // console.log(response);
    } catch (err: any) {
      // Check if Axios error
      // console.log(err);
      if (err.response?.data?.error?.message) {
        toast.error(err.response.data.error.message); // show API error
      } else {
        toast.error("An error occurred, please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Personal Information";
      case 2:
        return "Address";
      case 3:
        return "NIU Number";
      case 4:
        return "Account Credentials";
      default:
        return "";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return "Let's start with your basic information";
      case 2:
        return "Where are you located?";
      case 3:
        return "We need your NIU for verification";
      case 4:
        return "Create your account credentials";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Image src="/NaBank-Icon.png" width={50} height={50} alt="icon" />
          </div>
          <CardTitle className="text-2xl font-bold">{getStepTitle()}</CardTitle>
          <CardDescription>{getStepDescription()}</CardDescription>

          {/* Progress Indicator */}
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>
                Step {currentStep} of {totalSteps}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <RenderRegistrationStep
              currentStep={currentStep}
              password={password}
              confirmPassword={confirmPassword}
              errors={errors}
              handleInputChange={handleInputChange}
              setPassword={setPassword}
              setConfirmPassword={setConfirmPassword}
              formData={formData}
            />

            {/* Navigation Buttons */}
            <div className="flex gap-2">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1 bg-transparent"
                  disabled={loading}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}

              {currentStep < totalSteps ? (
                <Button type="button" onClick={handleNext} className="flex-1">
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  disabled={loading}
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1"
                >
                  {loading && <Loader2 className="animate-spin" />}Complete
                  Registration
                </Button>
              )}
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {"Already have an account? "}
              <Link href="/auth/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
