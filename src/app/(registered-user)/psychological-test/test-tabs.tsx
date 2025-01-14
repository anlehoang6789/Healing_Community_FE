"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PsychologicalTestForm from "@/app/(registered-user)/psychological-test/psychological-test-form";
import MBTITestForm from "@/app/(registered-user)/psychological-test/mbti-test-form";

export default function TestTabs() {
  return (
    <Tabs defaultValue="feedback" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="feedback">DASS21</TabsTrigger>
        <TabsTrigger value="info">MBTI</TabsTrigger>
      </TabsList>
      <TabsContent value="feedback">
        <PsychologicalTestForm />
      </TabsContent>
      <TabsContent value="info">
        <MBTITestForm />
      </TabsContent>
    </Tabs>
  );
}
