import { getAPIUrl } from "@services/config/config";
import { RequestBody, RequestBodyForm } from "@services/utils/ts/requests";

export async function createActivity(data: any, chapter_id: any, org_id: any) {
  data.content = {};
  // remove chapter_id from data
  delete data.chapterId;

  const result = await fetch(`${getAPIUrl()}activities/?coursechapter_id=${chapter_id}&org_id=${org_id}`, RequestBody("POST", data));
  const res = await result.json();
  return res;
}

export async function createFileActivity(file: File, type: string, data: any, chapter_id: any) {
  // Send file thumbnail as form data
  const formData = new FormData();
  formData.append("coursechapter_id", chapter_id);

  let org_id = "test";

  let endpoint = `${getAPIUrl()}activities/video?org_id=${org_id}`;

  if (type === "video") {
    formData.append("name", data.name);
    formData.append("video_file", file);
    endpoint = endpoint;
  }

  const result: any = await fetch(endpoint, RequestBodyForm("POST", formData));
  const res = await result.json();
  return res;
}

export async function getActivity(activity_id: any) {
  const result = await fetch(`${getAPIUrl()}activities/${activity_id}`, RequestBody("GET", null));
  const res = await result.json();
  return res;
}

export async function updateActivity(data: any, activity_id: any) {
  const result = await fetch(`${getAPIUrl()}activities/${activity_id}`, RequestBody("PUT", data));
  const res = await result.json();
  return res;
}
