export default function formatTime(time: string) {
  return new Date(time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}
