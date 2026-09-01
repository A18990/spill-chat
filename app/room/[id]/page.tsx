import ChatRoom from '@/components/chat-room'
export default async function RoomPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return <ChatRoom id={id} /> }
