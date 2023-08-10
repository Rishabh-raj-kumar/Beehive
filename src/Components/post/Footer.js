
export default function Footer({caption,username}) {
  return (
    <div className="p-4 pt-0 pb-2 text-white">
        <span className="mr-1 font-bold">{username}</span>
        <span>{caption}</span>
    </div>
  )
}