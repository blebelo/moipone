import { StateMap } from "./constants";

export const mergePayloadHandler = (state: StateMap, action: { payload: StateMap}) => ({
    ...state,
    ...action.payload
    });

export const scrolltoSection = (sectionId: string) => {
   if (sectionId === "home") {
     window.scrollTo({ top: 0, behavior: "smooth" });
     return;
   } 
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth"});
};