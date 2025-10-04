type Props = { user: any };

export default function Dashboard({ user }: Props) {
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, <strong>{user?.name}</strong>!</p>
    </div>
  );
}
