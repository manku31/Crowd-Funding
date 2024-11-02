import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { money } from "../assets";
import { CustomButton, FormField } from "../components";
import { checkIfImage } from "../utils";

import { useStateContext } from "../context";
import { ethers } from "ethers";

interface FormData {
  name: string;
  title: string;
  description: string;
  target: string;
  deadline: string;
  image: string;
}

export default function CreateCampaign() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });

  function handleFormFieldChange(
    fieldName: keyof FormData,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [fieldName]: e.target.value });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);

        await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        });

        setIsLoading(false);
        navigate("/campaigns");
      } else {
        alert("Provide Valid Image URL");
        setForm({ ...form, image: "" });
      }
    });
  }

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && "Loading..."}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold text-white sm:text-[25px] text-[18px] leading-1[38px]">
          This is Create Campaign page
        </h1>
      </div>
      <form
        className="w-full mt-[65px] flex flex-col gap-[30px]"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            lableName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handelChange={(e) => handleFormFieldChange("name", e)}
          />
          <FormField
            lableName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handelChange={(e) => handleFormFieldChange("title", e)}
          />
        </div>

        <FormField
          lableName="Story *"
          placeholder="Write your story"
          inputType="text"
          isTextArea
          value={form.description}
          handelChange={(e) => handleFormFieldChange("description", e)}
        />

        <div className="w-full flex justify-center items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img
            src={money}
            alt="money"
            className="w-[35px] h-[35px] object-contain"
          />
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[10px]">
            You will get 100% of raise amount
          </h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            lableName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handelChange={(e) => handleFormFieldChange("target", e)}
          />
          <FormField
            lableName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handelChange={(e) => handleFormFieldChange("deadline", e)}
          />
        </div>

        <FormField
          lableName="Campaign image *"
          placeholder="Place image url of campaign"
          inputType="url"
          value={form.image}
          handelChange={(e) => handleFormFieldChange("image", e)}
        />

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  );
}
