export interface PriorityAccessFormData {
  firstName: string;
  lastName?: string;
  email: string;
  company: string;
  role?: string;
  aiUseCase?: string;
  hearAboutUs?: string;
  currency?: string;
  additionalDetails?: string;
  phone?: string;
}

export interface SubmitLeadResult {
  success: boolean;
  message: string;
  leadId?: string;
  riskScore?: number;
}

export async function submitPriorityAccessForm(
  formData: PriorityAccessFormData
): Promise<SubmitLeadResult> {
  try {
    const response = await fetch("/api/submit-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = (await response.json()) as SubmitLeadResult;

    if (!response.ok || !data.success) {
      return {
        success: false,
        message: data.message || "Something went wrong. Please try again.",
      };
    }

    return data;
  } catch {
    return {
      success: false,
      message: "Network error. Please check your connection and try again.",
    };
  }
}
