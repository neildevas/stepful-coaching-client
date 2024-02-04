// Switch between student and coaches here
// Just fetch all users and group by Students and group by Coaches
export type User = {
  id: number;
  name: string;
  email: string;
  userType: 'student' | 'coach';
  Student?: Student;
  Coach?: Coach;
}

type Student = { id: number; user_id: number };
type Coach = { id: number; user_id: number };

export type Appointment = {
  id: number;
  status: string;
  coach_id: string;
  start_time: string;
  end_time: string;
  Coach: {
    User: {
      name: string;
      email: string;
    }
  }
}
