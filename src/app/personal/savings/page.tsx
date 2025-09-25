"use client";

import { useState } from "react";
import { SavingsProjectCard } from "@/components/savings/savings-project-card";
import { TontineGroupCard } from "@/components/savings/tontine-group-card";
import { CreateSavingsDialog } from "@/components/savings/create-savings-dialog";
import { JoinTontineDialog } from "@/components/savings/join-tontine-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  mockSavingsProjects,
  mockTontineGroups,
  type SavingsProject,
  type TontineGroup,
} from "@/lib/mock-data";
import { PiggyBank, Users } from "lucide-react";

export default function SavingsPage() {
  const [selectedProject, setSelectedProject] = useState<SavingsProject | null>(
    null
  );
  const [selectedGroup, setSelectedGroup] = useState<TontineGroup | null>(null);

  const handleAddMoney = (project: SavingsProject) => {
    console.log("Adding money to project:", project.id);
  };

  const handleWithdraw = (project: SavingsProject) => {
    console.log("Withdrawing from project:", project.id);
  };

  const handleViewProjectDetails = (project: SavingsProject) => {
    console.log("Viewing project details:", project.id);
  };

  const handleContribute = (group: TontineGroup) => {
    console.log("Contributing to tontine:", group.id);
  };

  const handleViewGroupDetails = (group: TontineGroup) => {
    console.log("Viewing group details:", group.id);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Savings</h1>
          <p className="text-muted-foreground">
            Manage your personal savings and group tontines
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <PiggyBank className="h-4 w-4" />
            Personal Savings
          </TabsTrigger>
          <TabsTrigger value="tontine" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Group Tontines
          </TabsTrigger>
        </TabsList>

        {/* Personal Savings Tab */}
        <TabsContent value="personal" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Your Savings Goals</h2>
            <CreateSavingsDialog />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockSavingsProjects.map((project) => (
              <SavingsProjectCard
                key={project.id}
                project={project}
                onAddMoney={() => handleAddMoney(project)}
                onWithdraw={() => handleWithdraw(project)}
                onViewDetails={() => handleViewProjectDetails(project)}
              />
            ))}
          </div>

          {mockSavingsProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <PiggyBank className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No savings goals yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first savings goal to get started
              </p>
              <CreateSavingsDialog />
            </div>
          )}
        </TabsContent>

        {/* Tontine Tab */}
        <TabsContent value="tontine" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Your Tontine Groups</h2>
            <JoinTontineDialog />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTontineGroups.map((group) => (
              <TontineGroupCard
                key={group.id}
                group={group}
                onContribute={() => handleContribute(group)}
                onViewDetails={() => handleViewGroupDetails(group)}
              />
            ))}
          </div>

          {mockTontineGroups.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">
                No tontine groups yet
              </h3>
              <p className="text-muted-foreground mb-4">
                Join a tontine group to start saving with others
              </p>
              <JoinTontineDialog />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
