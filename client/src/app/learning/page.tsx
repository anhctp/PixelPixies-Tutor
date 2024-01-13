import Inquiry from "@/components/learning/inquiry";
import MyLearning from "@/components/learning/me";
import Questgen from "@/components/learning/questgen";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LearningItems } from "@/services/learning/learningHelper";

export default function Home() {
  return (
    <Tabs
      defaultValue={LearningItems.QUESTGEN}
      className="w-full h-full flex flex-col items-center"
    >
      <TabsList className="w-full justify-around">
        <TabsTrigger value={LearningItems.QUESTGEN} className="w-1/2">
          {LearningItems.QUESTGEN}
        </TabsTrigger>
        <TabsTrigger value={LearningItems.INQUIRY} className="w-1/2">
          {LearningItems.INQUIRY}
        </TabsTrigger>
        <TabsTrigger value={LearningItems.ME} className="w-1/2">
          {LearningItems.ME}
        </TabsTrigger>
      </TabsList>
      <TabsContent value={LearningItems.QUESTGEN} className="h-full">
        <Questgen />
      </TabsContent>
      <TabsContent value={LearningItems.INQUIRY} className="h-full">
        <Inquiry />
      </TabsContent>
      <TabsContent value={LearningItems.ME} className="h-full">
        <MyLearning />
      </TabsContent>
    </Tabs>
  );
}
