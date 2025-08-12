"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Inquiry } from "./inquiry-table/columns";
import { useUpdateInquiry } from "../queries/use-update-inquiry";
import { useDeleteInquiry } from "../queries/use-delete-inquiry";

interface ViewInquiryProps {
  inquiry: Inquiry;
  children: React.ReactNode;
}

export function ViewInquiry({ inquiry, children }: ViewInquiryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(inquiry.status);

  const { mutate: updateInquiry, isPending: isUpdating } = useUpdateInquiry(
    inquiry.id
  );
  const { mutate: deleteInquiry, isPending: isDeleting } = useDeleteInquiry(
    inquiry.id
  );

  const handleStatusChange = (newStatus: string) => {
    setCurrentStatus(newStatus as typeof inquiry.status);
    updateInquiry({ status: newStatus as typeof inquiry.status });
  };

  const handleDelete = () => {
    deleteInquiry(undefined, {
      onSuccess: () => {
        setShowDeleteDialog(false);
        setIsOpen(false);
      }
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "unread":
        return "bg-red-100 text-red-800";
      case "read":
        return "bg-blue-100 text-blue-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Inquiry Details
              <Badge
                className={getStatusColor(
                  currentStatus || inquiry.status || "unread"
                )}
              >
                {currentStatus || inquiry.status || "unread"}
              </Badge>
            </DialogTitle>
            <DialogDescription>
              View and manage inquiry from {inquiry.name}
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[60vh] px-1">
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Name
                    </label>
                    <p className="mt-1 text-sm">{inquiry.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Email
                    </label>
                    <p className="mt-1 text-sm">{inquiry.email}</p>
                  </div>
                  {inquiry.company && (
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-gray-500">
                        Company
                      </label>
                      <p className="mt-1 text-sm">{inquiry.company}</p>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* Message */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Message</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm whitespace-pre-wrap">
                    {inquiry.message}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Metadata */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Received At
                    </label>
                    <p className="mt-1">
                      {format(new Date(inquiry.createdAt), "PPP 'at' p")}
                    </p>
                  </div>
                  {inquiry.updatedAt && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Last Updated
                      </label>
                      <p className="mt-1">
                        {format(new Date(inquiry.updatedAt), "PPP 'at' p")}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ScrollArea>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <div className="flex items-center gap-2 flex-1">
              <label htmlFor="status-select" className="text-sm font-medium">
                Status:
              </label>
              <Select
                value={currentStatus || inquiry.status || "unread"}
                onValueChange={handleStatusChange}
                disabled={isUpdating}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setShowDeleteDialog(true)}
                disabled={isDeleting}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              inquiry from {inquiry.name}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
