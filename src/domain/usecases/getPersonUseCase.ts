import { getPerson } from "../../data/api/titleApi";
import type { PersonModel } from "../model/PersonModel";

export default async function getPersonUseCase(personId: number): Promise<PersonModel> {
  return await getPerson(personId);
}
