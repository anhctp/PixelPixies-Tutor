import Inquiry from "@/components/learning/inquiry";
import Questgen from "@/components/learning/questgen";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LearningItems } from "@/services/learning/learningHelper";

export default function Home() {
  return (
    <Tabs
      defaultValue={LearningItems.QUESTGEN}
      className="w-full flex flex-col items-center"
    >
      <TabsList className="w-full justify-around">
        <TabsTrigger value={LearningItems.QUESTGEN} className="w-1/2">
          {LearningItems.QUESTGEN}
        </TabsTrigger>
        <TabsTrigger value={LearningItems.INQUIRY} className="w-1/2">
          {LearningItems.INQUIRY}
        </TabsTrigger>
      </TabsList>
      <TabsContent value={LearningItems.QUESTGEN}>
        <Questgen />
      </TabsContent>
      <TabsContent value={LearningItems.INQUIRY}>
        <Inquiry />
      </TabsContent>
    </Tabs>
  );
}
