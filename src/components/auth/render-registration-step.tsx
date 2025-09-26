import { CalendarIcon, CheckCircle, Eye, EyeOff } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { CustomerForm } from "@/lib/type";
import { useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Autocomplete } from "@react-google-maps/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const RenderRegistrationStep = ({
  currentStep,
  formData,
  errors,
  handleInputChange,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}: {
  currentStep: number;
  formData: CustomerForm;
  errors: any;
  handleInputChange: (field: string, value: string | boolean) => void;
  password: string;
  setPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
}) => {
  // const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const addressRef = useRef<google.maps.places.Autocomplete | null>(null);

  const handleAddressSelect = () => {
    if (addressRef.current) {
      const place = addressRef.current.getPlace();
      // console.log(place);
      if (place && place.address_components) {
        place.address_components.forEach((component: any) => {
          const types = component.types;

          if (types.includes("country")) {
            handleInputChange("country", component.long_name);
          }

          if (types.includes("administrative_area_level_1")) {
            handleInputChange("region", component.long_name);
          }

          if (types.includes("locality")) {
            handleInputChange("city", component.long_name);
          }
        });
      }

      // Handle plus_code (postalCode)
      if (place.vicinity) {
        handleInputChange("postalCode", place.vicinity);
      }
      if (place.name) {
        handleInputChange("address", place.name);
      }
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className={errors.firstName ? "border-red-500" : ""}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className={errors.lastName ? "border-red-500" : ""}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                onValueChange={(value) => handleInputChange("gender", value)}
                value={formData.gender}
              >
                <SelectTrigger
                  className={errors.gender ? "border-red-500 w-full" : "w-full"}
                >
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Date of Birth</Label>
              <Popover>
                <PopoverTrigger className="w-full">
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.birthdate && "text-muted-foreground",
                      errors.birthdate && "border-red-500"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.birthdate
                      ? format(formData.birthdate, "PPP")
                      : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={
                      formData.birthdate
                        ? new Date(formData.birthdate)
                        : undefined
                    }
                    onSelect={(date: Date | undefined) => {
                      if (date)
                        handleInputChange("birthdate", date.toISOString()); // store as string
                    }}
                    disabled={(date: Date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              {errors.dateOfBirth && (
                <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address-input">Address</Label>
              <Autocomplete
                onLoad={(ref) => (addressRef.current = ref)}
                onPlaceChanged={handleAddressSelect}
              >
                <Input
                  id="address-input"
                  placeholder="Start typing your address..."
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className={errors.address ? "border-red-500" : ""}
                />
              </Autocomplete>
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}
              {/* {!isGoogleMapsLoaded && (
                <p className="text-sm text-muted-foreground">
                  Loading Google Maps...
                </p>
              )}
              {formData.latitude && formData.longitude && (
                <div className="text-sm text-green-600 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Location captured: {formData.latitude.toFixed(6)},{" "}
                  {formData.longitude.toFixed(6)}
                </div>
              )} */}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="idType">ID Type</Label>
              <Select
                onValueChange={(value) => handleInputChange("idType", value)}
                value={formData.idType}
              >
                <SelectTrigger
                  className={errors.idType ? "border-red-500 w-full" : "w-full"}
                >
                  <SelectValue placeholder="Select ID Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CNI">CNI</SelectItem>
                  <SelectItem value="PASSPORT">Passport</SelectItem>
                  <SelectItem value="DRIVER_LICENCE">Driver Licence</SelectItem>
                </SelectContent>
              </Select>
              {errors.idType && (
                <p className="text-red-500 text-sm">{errors.idType}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="cniNumber">ID Number</Label>
              <Input
                id="cniNumber"
                placeholder="Enter your ID number"
                value={formData.cniNumber}
                onChange={(e) => handleInputChange("cniNumber", e.target.value)}
                className={errors.cniNumber ? "border-red-500" : ""}
              />
              {errors.cniNumber && (
                <p className="text-red-500 text-sm">{errors.cniNumber}</p>
              )}
              <p className="text-sm text-muted-foreground">
                Your ID Document Number is required for account verification.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="nui">NIU Number</Label>
              <Input
                id="nui"
                placeholder="Enter your NIU number"
                value={formData.nui}
                onChange={(e) => handleInputChange("nui", e.target.value)}
                className={errors.nui ? "border-red-500" : ""}
              />
              {errors.nui && (
                <p className="text-red-500 text-sm">{errors.nui}</p>
              )}
              <p className="text-sm text-muted-foreground">
                Your National Identity Number (NIU) is required for account
                verification.
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="emailAddress">emailAddress</Label>
              <Input
                id="emailAddress"
                type="emailAddress"
                placeholder="john@example.com"
                value={formData.emailAddress}
                onChange={(e) =>
                  handleInputChange("emailAddress", e.target.value)
                }
                className={errors.emailAddress ? "border-red-500" : ""}
              />
              {errors.emailAddress && (
                <p className="text-red-500 text-sm">{errors.emailAddress}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobilePhoneNumber">
                mobilePhoneNumber Number
              </Label>
              <div className="flex">
                <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                  <span className="text-sm">+237</span>
                </div>
                <Input
                  id="mobilePhoneNumber"
                  type="tel"
                  placeholder="6XXXXXXXX"
                  value={formData.mobilePhoneNumber}
                  onChange={(e) =>
                    handleInputChange("mobilePhoneNumber", e.target.value)
                  }
                  className={cn(
                    "rounded-l-none",
                    errors.mobilePhoneNumber && "border-red-500"
                  )}
                />
              </div>
              {errors.mobilePhoneNumber && (
                <p className="text-red-500 text-sm">
                  {errors.mobilePhoneNumber}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={errors.password ? "border-red-500" : ""}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={errors.confirmPassword ? "border-red-500" : ""}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return renderStep();
};
