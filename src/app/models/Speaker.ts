export class Speaker{
  private speaker_id:number;
  private speaker_name: string;
  private speaker_email: string;
  private speaker_description: string;

  constructor(SpeakerID: number, SpeakerName: string, SpeakerEmail: string, SpeakerDescription: string) {
    this.speaker_id = SpeakerID;
    this.speaker_name = SpeakerName;
    this.speaker_email = SpeakerEmail;
    this.speaker_description = SpeakerDescription;
  }

  set SpeakerID(value: number) {
    this.speaker_id = value;
  }

  set SpeakerName(value: string) {
    this.speaker_name = value;
  }

  set SpeakerEmail(value: string) {
    this.speaker_email = value;
  }

  set SpeakerDescription(value: string) {
    this.speaker_description = value;
  }

  get SpeakerID(): number {
    return this.speaker_id;
  }

  get SpeakerName(): string {
    return this.speaker_name;
  }

  get SpeakerEmail(): string {
    return this.speaker_email;
  }

  get SpeakerDescription(): string {
    return this.speaker_description;
  }
}