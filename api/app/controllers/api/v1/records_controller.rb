class Api::V1::RecordsController < ApplicationController
  before_action :set_record, only: [:show, :update, :destroy]

  # GET /api/v1/records
  def index
    @records = Record.all
    render json: @records
  end

  # GET /api/v1/records/:id
  def show
    render json: @record
  end

  # POST /api/v1/records
  def create
    @record = Record.find_or_initialize_by(user_id: record_params[:user_id], record_date: record_params[:record_date])
    
    if @record.update(record_params)
      render json: @record, status: :ok
    else
      render json: { errors: @record.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @record = Record.find_by(user_id: params[:user_id], record_date: params[:record_date])
    if @record.update(record_params)
      render json: { message: 'Record updated successfully', record: @record }, status: :ok
    else
      render json: { errors: @record.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show_by_date
    @record = Record.find_by(record_date: params[:record_date], user_id: params[:user_id])

    if @record
      render json: @record
    else
      render json: { error: "Record not found" }, status: :not_found
    end
  end
  
  private

  def set_record
    if params[:record_date].present? && params[:user_id].present?
      @record = Record.find_by!(record_date: params[:record_date], user_id: params[:user_id])
    else
      render json: { error: "Record date or user ID is missing" }, status: :unprocessable_entity
    end  end

  def record_params
    params.require(:record).permit(:user_id,:record_date, :temperature, :weight, :note, :is_period_start, :is_period_end, :is_discharge, :is_spotting, :is_taking_pill)
  end
end
