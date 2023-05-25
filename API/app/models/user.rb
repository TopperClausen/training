class User < ApplicationRecord
    has_secure_password
    validates :email, presence: true, uniqueness: true
    validates :first_name, presence: true
    validates :last_name, presence: true

    def jwt
        payload = self.attributes
        payload.delete("password_digest")
        print payload
        JWT.encode(payload, ENV["SECRET"], 'HS256')
    end

    def self.decode_jwt(jwt)
        decoded = JWT.decode(jwt, ENV["SECRET"], true, {algorithm: 'HS256'})[0]
        User.find(decoded["id"])
    end
end