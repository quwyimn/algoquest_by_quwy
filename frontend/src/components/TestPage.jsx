import React from 'react';

const TestPage = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 'calc(100vh - 120px)',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <h1 style={{ color: 'white', marginBottom: '2rem' }}>
        🎉 AlgoQuest Test Page
      </h1>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        padding: '2rem',
        borderRadius: '1rem',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        maxWidth: '500px',
        width: '100%'
      }}>
        <h2 style={{ color: 'white', marginBottom: '1rem' }}>
          ✅ Layout căn giữa hoạt động!
        </h2>
        <p style={{ color: '#a1a1aa', marginBottom: '1rem' }}>
          Nếu bạn thấy trang này căn giữa màn hình, thì layout đã được sửa thành công.
        </p>
        <button 
          onClick={() => window.location.href = '/login'}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600'
          }}
        >
          Thử đăng nhập
        </button>
      </div>
    </div>
  );
};

export default TestPage;
