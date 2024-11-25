module Users
  class RegistrationsController < Devise::RegistrationsController
    skip_before_action :verify_authenticity_token, only: [:create]
    before_action :configure_sign_up_params, only: [:create]

    protected

    def configure_sign_up_params
      devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :password, :cycle])
    end
  end
end
