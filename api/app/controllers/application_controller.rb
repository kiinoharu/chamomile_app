class ApplicationController < ActionController::Base
  before_action :authenticate_user! # Devise による認証を有効化
  before_action :configure_permitted_parameters, if: :devise_controller?

  protect_from_forgery with: :exception, unless: -> { request.format.json? }

  protected

  # Deviseストロングパラメータ設定
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :cycle])
    devise_parameter_sanitizer.permit(:sign_in, keys: [:username])
  end
end
