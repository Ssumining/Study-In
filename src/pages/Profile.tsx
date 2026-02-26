import ProfileCard from '../features/profile/components/ProfileCard'
import ActivityTabs from '../features/profile/components/ActivityTabs'

const Profile = () => {
  return (
    <div className="max-w-md mx-auto">
      <ProfileCard />
      <ActivityTabs />
    </div>
  )
}

export default Profile