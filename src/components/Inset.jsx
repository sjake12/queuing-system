import React from "react";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import StudentQueue from "@/components/StudentQueue";
import AdminQueue from "@/components/AdminQueue";
import UserSettings from "@/components/UserSettings";
import Requirements from "@/components/Requirements";
import Payments from "@/components/Payments";
import Upcoming from "@/components/Upcoming";
import Listed from "@/components/Listed";

export default function Inset({ pathArray }) {
  const defaultDashboard = (path) => {
    if (path === "student" || path === "admin") {
      return "dashboard";
    }

    return path;
  };

  const getRouteComponent = (path) => {
    switch (path) {
      case "/student" || "/admin":
        return (
          <>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          </>
        );
      case "/student/queue":
        return <StudentQueue />;
      case "/admin/queue":
        return <AdminQueue />;
      case "/student/requirements":
        return <Requirements />;
      case "/student/payments":
        return <Payments />;
      case "/student/upcoming":
        return <Upcoming />;
      case "/student/listed":
        return <Listed />;
      case "/student/settings" || "/admin/settings":
        return <UserSettings />;
      default:
        return (
          <>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          </>
        );
    }
  };

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {pathArray.map((path, index) => {
                return (
                  <React.Fragment key={index}>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink asChild>
                        {index === pathArray.length - 1 ? (
                          <BreadcrumbPage className="capitalize">
                            {defaultDashboard(path)}
                          </BreadcrumbPage>
                        ) : (
                          <Link to="#" className="capitalize">
                            {defaultDashboard(path)}
                          </Link>
                        )}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {index < pathArray.length - 1 && (
                      <BreadcrumbSeparator className="hidden md:block" />
                    )}
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="p-4 pt-0">{getRouteComponent(location.pathname)}</div>
    </SidebarInset>
  );
}
