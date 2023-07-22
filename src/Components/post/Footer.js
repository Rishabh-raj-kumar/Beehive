
export default function Footer({caption,username}) {
  return (
    <div className="p-4 pt-0 pb-2">
        <span className="mr-1 font-semibold">{username}</span>
        <span>{caption}</span>
    </div>
  )
}