import axios from "axios";
import React, { useState } from 'react';
import style from './streakRegister.module.scss';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const StreakRegister = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDays, setSelectedDays] = useState({
    "월": true,
    "화": true,
    "수": true,
    "목": true,
    "금": true,
    "토": true,
    "일": true,
  });

  const handleDayChange = (e) => {
    const { name, checked } = e.target;
    setSelectedDays({ ...selectedDays, [name]: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ title, description, selectedDays });
    const data = await axios.post('http://localhost:8080/api/work/register',{ title, description, selectedDays })
    alert("성공적으로 등록되었습니다!")
    navigate("/");
  };

  return (
    <div className={style.scheduleFormContainer}>
      <button onClick={() => navigate(-1)} className={style.backButton}>
        <FaArrowLeft size={20} /> {/* 화살표 아이콘 */}
      </button>
      <form onSubmit={handleSubmit}>
        <h2>일정 등록</h2>

        <label htmlFor="title">일정 제목:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="description">일정 설명:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>스트릭 연장 요일:</label>
        <div className={style.checkboxGroup}>
          {["월","화","수","목","금","토","일"].map((day, idx) => (
            <label key={idx} className={style.checkboxLabel}>
              <input
                type="checkbox"
                name={day}
                checked={selectedDays[day]}
                onChange={handleDayChange}
              />
              {day}  {/* Capitalizes day names */}
            </label>
          ))}
        </div>

        {/* Submit Button */}
        <button type="submit" className={style.submitButton}>
          확인
        </button>
      </form>
    </div>
  );
};

export default StreakRegister;
