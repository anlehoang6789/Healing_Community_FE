import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users as UserIcon, ChevronsRight } from "lucide-react";
import React from "react";

const personalityTypes = [
  { code: "ISTJ", name: "Người trách nhiệm", color: "bg-red-100" },
  { code: "ISFJ", name: "Người nuôi dưỡng", color: "bg-orange-100" },
  { code: "ISFP", name: "Người nghệ sĩ", color: "bg-green-100" },
  { code: "ISTP", name: "Nhà kỹ thuật", color: "bg-yellow-100" },
  { code: "INFP", name: "Người lý tưởng hóa", color: "bg-pink-100" },
  { code: "INFJ", name: "Người che chở", color: "bg-amber-100" },
  { code: "INTJ", name: "Nhà khoa học", color: "bg-purple-100" },
  { code: "INTP", name: "Nhà tư duy", color: "bg-lime-100" },
  { code: "ENFJ", name: "Người cho đi", color: "bg-violet-100" },
  { code: "ENFP", name: "Người truyền cảm hứng", color: "bg-sky-100" },
  { code: "ENTJ", name: "Nhà điều hành", color: "bg-blue-100" },
  { code: "ENTP", name: "Người nhìn xa", color: "bg-cyan-100" },
];

export default function DialogRecommendGroup() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className=" rounded-xl w-full py-2 bg-gray-100 hover:border hover:border-green-500 flex items-center justify-between">
          <div className="flex items-center px-3">
            <UserIcon className="text-green-500 mr-2" />
            <div className="flex flex-col items-start">
              <strong className="text-green-500 text-sm">10 nhóm</strong>
              <div className="flex items-center text-xs text-gray-600">
                <p>Phù hợp với</p> <b className="pl-1">Acute Stress</b>
              </div>
            </div>
          </div>
          <ChevronsRight className="text-green-500 pr-2" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl ">
        <DialogTitle className="sr-only">Edit profile</DialogTitle>
        <DialogDescription className="sr-only">
          Make changes to your profile here. Click save when done.
        </DialogDescription>
        <ScrollArea className="h-[60vh]">
          <h2 className="text-2xl font-bold mb-4 text-muted-foreground">
            10 nhóm phù hợp với Acute Stress
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {personalityTypes.map((type) => (
              <div
                key={type.code}
                className={`${type.color} rounded-lg p-4 flex items-center space-x-4 text-black cursor-pointer`}
              >
                <Avatar>
                  <AvatarImage
                    src={`https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d${type.code}`}
                    alt={type.code}
                  />
                  <AvatarFallback>{type.code}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold">{type.code}</h3>
                  <p className="text-sm">{type.name}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
