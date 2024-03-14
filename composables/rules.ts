export const useFormRules = () => {
  return {
    ruleRequired: (v: any) => !!v || "Required",
    rulePassLen: (v: string) =>
      (!!v && v.length >= 6) || "Password less than 8 caracteres",
  };
};
