/** @type {import('tailwindcss').Config} */
export default {
    content: [ // 新增
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}", 
    ],
    theme: {
      extend: {
        keyframes: {
          // 淡入向上
          'fade-in-up': {
            '0%': {
              opacity: '0',
              transform: 'translateY(20px)'
            },
            '100%': {
              opacity: '1',
              transform: 'translateY(0)'
            }
          },
          // 淡入向下
          'fade-in-down': {
            '0%': {
              opacity: '0',
              transform: 'translateY(-20px)'
            },
            '100%': {
              opacity: '1',
              transform: 'translateY(0)'
            }
          },
          // 左向右淡入
          'fade-in-left': {
          '0%': {
            opacity: '0',
            transform: 'translateX(-30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        // 右向左淡入
        'fade-in-right': {
          '0%': {
            opacity: '0',
            transform: 'translateX(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },

        // 縮放動畫
        'scale-in': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.9)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)'
          }
        },
        'scale-out': {
          '0%': {
            opacity: '1',
            transform: 'scale(1)'
          },
          '100%': {
            opacity: '0',
            transform: 'scale(0.9)'
          }
        },

        // 由下向上滑入
        'slide-up': {
          '0%': {
            transform: 'translateY(100%)'
          },
          '100%': {
            transform: 'translateY(0)'
          }
        },
        // 由上向下滑入
        'slide-down': {
          '0%': {
            transform: 'translateY(-100%)'
          },
          '100%': {
            transform: 'translateY(0)'
          }
        },

        // 彈跳動畫
        'bounce-in': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.3)'
          },
          '50%': {
            opacity: '1',
            transform: 'scale(1.05)'
          },
          '70%': {
            transform: 'scale(0.9)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)'
          }
        },

        // 搖擺動畫
        'wiggle': {
          '0%, 100%': {
            transform: 'rotate(-3deg)'
          },
          '50%': {
            transform: 'rotate(3deg)'
          }
        },

        // 脈衝動畫
        'pulse-soft': {
          '0%, 100%': {
            opacity: '1'
          },
          '50%': {
            opacity: '0.5'
          }
        },

        // 閃爍動畫
        'shimmer': {
          '0%': {
            backgroundPosition: '-200% 0'
          },
          '100%': {
            backgroundPosition: '200% 0'
          }
        },

        },
        animation: {
          'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
          'fade-in-down': 'fade-in-down 0.6s ease-in forwards',
          'fade-in-left': 'fade-in-left 0.8s ease-out forwards',
          'fade-in-right': 'fade-in-right 0.8s ease-out forwards',
          'scale-in': 'scale-in 0.6s ease-out forwards',
          'scale-out': 'scale-out 0.6s ease-out forwards',
          'slide-up': 'slide-up 0.6s ease-out forwards',
          'slide-down': 'slide-down 0.6s ease-out forwards',
          'bounce-in': 'bounce-in 0.8s ease-out',
          'wiggle': 'wiggle 0.5s ease-in-out',
          'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
          'shimmer': 'shimmer 5s linear infinite'
        }
      },
      screens: {
        'lg': '1080px',
        'lgx': '1080px',        
        // 'xl': '1280px',         
        // '2xl': '1440px',
        // '3xl': '1600px',        
      },
    },
    plugins: [],
  }


// shimmer 動畫測試：
{/* <div className="animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] h-4 rounded-full"></div> */}

// 進入條動畫測試：
{/* <div className="w-full bg-gray-200 rounded-full h-2">
  <div className="bg-blue-600 h-2 rounded-full animate-pulse-soft" style={{width: '60%'}}></div>
</div> */}