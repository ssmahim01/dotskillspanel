"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { IClient } from "@/types/clients";
import {
  getClientFullName,
  formatCurrency,
  getProjectCompletionPercentage,
} from "@/features/clients/utils/client.utils";
import { ClientAvatar } from "./client-avatar";
import { ClientStatusBadge } from "./client-status-badge";
import { ClientTypeBadge } from "./client-type-badge";
import { RevenueCard } from "./revenue-card";
import { ClientInfoCard } from "./client-info-card";
import { ClientTimeline } from "./client-timeline";
import { DocumentItem } from "./document-item";
import {
  Mail,
  Phone,
  MapPin,
  Building,
  Globe,
  Calendar,
  Briefcase,
  BarChart3,
} from "lucide-react";
import { format } from "date-fns";

interface ClientDetailsSheetProps {
  client: IClient;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ClientDetailsSheet({
  client,
  open,
  onOpenChange,
}: ClientDetailsSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <SheetHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <ClientAvatar client={client} size="lg" />
              <div>
                <SheetTitle className="text-2xl">
                  {getClientFullName(client)}
                </SheetTitle>
                <div className="flex gap-2 mt-2">
                  <ClientStatusBadge status={client.status} />
                  <ClientTypeBadge type={client.clientType} />
                </div>
              </div>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <RevenueCard client={client} />

                <Card className="rounded-xl border-0 shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Project Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total Projects</span>
                      <span className="text-base font-semibold">
                        {client.totalProjects}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Active Projects</span>
                      <span className="text-base font-semibold">
                        {client.activeProjects}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Completion Rate</span>
                      <span className="text-base font-semibold">
                        {getProjectCompletionPercentage(client)}%
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {client.accountManager && (
                  <Card className="rounded-xl border-0 shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Account Manager
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm font-medium">
                        {client.accountManager.firstName}{" "}
                        {client.accountManager.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {client.accountManager.email}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4">
              <ClientInfoCard client={client} />

              {client.companyName && (
                <Card className="rounded-xl border-0 shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Company Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {client.companyName && (
                      <div className="flex items-start gap-3">
                        <Building className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">
                            Company
                          </p>
                          <p className="text-sm font-medium">
                            {client.companyName}
                          </p>
                        </div>
                      </div>
                    )}
                    {client.industry && (
                      <div className="flex items-start gap-3">
                        <BarChart3 className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">
                            Industry
                          </p>
                          <p className="text-sm font-medium">
                            {client.industry}
                          </p>
                        </div>
                      </div>
                    )}
                    {client.companyWebsite && (
                      <div className="flex items-start gap-3">
                        <Globe className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">
                            Website
                          </p>
                          <a
                            href={client.companyWebsite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-primary hover:underline"
                          >
                            {client.companyWebsite}
                          </a>
                        </div>
                      </div>
                    )}
                    {client.joinedAt && (
                      <div className="flex items-start gap-3">
                        <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">
                            Joined Date
                          </p>
                          <p className="text-sm font-medium">
                            {format(
                              new Date(client.joinedAt),
                              "MMM dd, yyyy"
                            )}
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="notes" className="space-y-4">
              <Card className="rounded-xl border-0 shadow-sm">
                <CardContent className="pt-6">
                  {client.notes && client.notes.length > 0 ? (
                    <ClientTimeline notes={client.notes} />
                  ) : (
                    <div className="py-8 text-center">
                      <p className="text-sm text-muted-foreground">
                        No notes yet
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-4">
              <Card className="rounded-xl border-0 shadow-sm">
                <CardContent className="pt-6">
                  {client.documents && client.documents.length > 0 ? (
                    <div className="space-y-3">
                      {client.documents.map((doc) => (
                        <DocumentItem key={doc._id} document={doc} />
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <p className="text-sm text-muted-foreground">
                        No documents uploaded
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}
