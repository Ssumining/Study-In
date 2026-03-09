import ProfileCard from '../features/profile/components/ProfileCard'
import MyPageSidebar from '@/components/common/MyPageSidebar'

const Profile = () => {
  return (
    <div className="flex gap-8 py-6">
      <MyPageSidebar />
      <div className="flex-1 min-w-0">
        <ProfileCard />
      </div>
    </div>
  )
}

export default Profile