// Switch between student and coaches here
// Just fetch all users and group by Students and group by Coaches
export type User = {
  id: number;
  name: string;
  email: string;
  type: 'student' | 'coach';
}
