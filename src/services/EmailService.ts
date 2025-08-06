// interface SendMailPayload {
//   to: string;
//   subject: string;
//   body: string;
//   attachment?:File;
// }

// Sửa lại để nhận FormData thay vì SendMailPayload
export async function sendMail(formData: FormData) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${API_BASE_URL}/send-mail`, {
    method: "POST",
    headers: {
      // KHÔNG đặt Content-Type ở đây!
      "Authorization": `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

export async function getInbox() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${API_BASE_URL}/inbox`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

export async function countInbox() {
  const token = localStorage.getItem("accessToken");
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!token) {
    throw new Error("Access token not found");
  }

  // Gọi đến API đếm mà chúng ta đã tạo
  const response = await fetch(`${API_BASE_URL}/countInbox`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.countInbox; // Chỉ trả về con số
}

export async function getSent() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${API_BASE_URL}/sent`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}


export async function countSent() {
  const token = localStorage.getItem("accessToken");
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!token) {
    throw new Error("Access token not found");
  }

  // Gọi đến API đếm mà chúng ta đã tạo
  const response = await fetch(`${API_BASE_URL}/countSent`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.countInbox; // Chỉ trả về con số
}

export interface SearchSentParams {
  subject?: string;
  body?: string;
}

export interface AttachmentInterface{
    name:string
    mine:string
    size:number
    saved_path:string
}



export interface MailData {
    to?:string
    from?:string
    date:string
    body:string
    subject:string
    attachments:AttachmentInterface[]
}

export async function searchSentService(params: SearchSentParams): Promise<MailData[]> {
  const query = new URLSearchParams();
  const token = localStorage.getItem("accessToken");
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (params.subject) query.append('subject', params.subject);
  if (params.body) query.append('body', params.body);

  const response = await fetch(`${API_BASE_URL}/search-sent?${query.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Fetch error:", errorData);
    throw new Error(errorData.error || 'Lỗi khi gọi API tìm kiếm email đã gửi.');
  }
  const data = await response.json();
  return data.data || [];
}

export async function searchInboxService(params: SearchSentParams): Promise<MailData[]> {
  const query = new URLSearchParams();
  const token = localStorage.getItem("accessToken");
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (params.subject) query.append('subject', params.subject);
  if (params.body) query.append('body', params.body);

  const response = await fetch(`${API_BASE_URL}/search-inbox?${query.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Fetch error:", errorData);
    throw new Error(errorData.error || 'Lỗi khi gọi API tìm kiếm email đã gửi.');
  }
  const data = await response.json();
  return data.data || [];
}



