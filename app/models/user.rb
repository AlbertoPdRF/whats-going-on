class User < ApplicationRecord
  devise :omniauthable, omniauth_providers: %i[github]

  def self.from_omniauth(auth)
    user = find_or_initialize_by(provider: auth.provider, uid: auth.uid)
    user.email = auth.info.email
    user.avatar = auth.info.image
    user.username = auth.info.nickname
    user.token = auth.credentials.token

    user.save
    user
  end
end
