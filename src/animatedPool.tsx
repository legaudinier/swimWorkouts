
import { Box } from "@mui/material";
import { PoolFloat } from "./svgs/poolFloat";
import Swimmer1 from './assets/butterflySwim.gif'
import Swimmer2 from './assets/freestyleSwim.gif'

const AnimatedPool = () => {

  return (
    <Box sx={{
      border: '2px solid blue', height: '80px',
      backgroundColor: '#90D5FF',
      marginLeft: '5px', marginRight: '5px'
    }}>
      <Box sx={{
        height: '33%', borderBottom: '2px dotted white',
        position: 'relative',
        '&::before': {
          content: '""', // top lane line
          position: 'absolute',
          top: '44%',
          left: '3%',
          width: '94%',
          height: '1px',
          backgroundColor: 'primary.main',
        },
      }}>
        {/* butterfly swimmer */}
        <Box sx={{
          width: '10px',
          height: '10px',
          position: 'relative',
          animationName: 'myAnimationFast',
          animationDuration: '60s',
          animationIterationCount: 'infinite',
          '@keyframes myAnimationFast': {
            "0%": {
              backgroundColor: 'none; left: 3%; top:7px',
              transform: 'rotate(90deg)'

            },
            "50%": {
              backgroundColor: 'none; left:98%; top:7px',
              transform: 'rotate(90deg)'

            },
            "51%": {
              backgroundColor: 'none; left:98%; top:7px',
              transform: 'rotate(270deg)'

            },
            "100%": {
              backgroundColor: 'none; left:0px; top:7px',
              transform: 'rotate(270deg)'

            }
          }
        }}>
          <Box
            component="img"
            sx={{
              height: 60,
              width: 60,
              position: 'absolute',
              left: '-25px'
            }}
            alt="butterfly swimmer"
            src={Swimmer1}
          />
        </Box>
        <Box sx={{
          '&::before': {
            content: '""', // left T line
            position: 'absolute',
            top: '29%',
            left: '3%',
            width: '95%',
            height: '10px',
            borderLeft: '1px solid #1976d2'
          },
        }}></Box>
        <Box sx={{
          '&::before': {
            content: '""', // right T line
            position: 'absolute',
            top: '29%',
            left: '97%',
            // width: '95%',
            height: '10px',
            borderLeft: '1px solid #1976d2'
          },
        }}></Box>
      </Box>
      <Box sx={{
        height: '33%', borderBottom: '2px dotted white',
        position: 'relative',
        '&::before': {
          content: '""', // main lane line middle
          position: 'absolute',
          top: '44%',
          left: '3%',
          width: '94%',
          height: '1px',
          backgroundColor: 'primary.main',
        },
      }} >
        {/* slower swimmer */}
        <Box sx={{
          width: '10px',
          height: '10px',
          position: 'relative',
          animationName: 'myAnimationSlow',
          animationDuration: '9s',
          animationIterationCount: 'infinite',
          '@keyframes myAnimationSlow': {
            "0%": {
              backgroundColor: 'none; left:0px; top:7px',
              transform: 'rotate(90deg)'

            },
            "50%": {
              backgroundColor: 'none; left:98%; top:7px',
              transform: 'rotate(90deg)'

            },
            "51%": {
              backgroundColor: 'none; left:98%; top:7px',
              transform: 'rotate(270deg)'

            },
            "100%": {
              backgroundColor: 'none; left:0px; top:7px',
              transform: 'rotate(270deg)'

            }
          }
        }}>
          <Box
            component="img"
            sx={{
              height: 55,
              width: 45,
              position: 'absolute',
              left: '-25px'
            }}
            alt="Freestyle swimmer 1"
            src={Swimmer2}
          />
        </Box>
        <Box sx={{
          '&::before': {
            content: '""', // left t line
            position: 'absolute',
            top: '29%',
            left: '3%',
            width: '95%',
            height: '10px',
            borderLeft: '1px solid #1976d2'
          },
        }}></Box>
        <Box sx={{
          '&::before': { // right t line
            content: "''",
            position: 'absolute',
            top: '29%',
            left: '97%',
            // width: '95%',
            height: '10px',
            borderLeft: '1px solid #1976d2'
          },
        }}></Box>
      </Box>
      <Box sx={{
        height: '33%',
        borderBottom: '2px dotted white',
        position: 'relative',
        '&::before': {
          content: '""', // bottom floating swimmer
          position: 'absolute',
          top: '44%',
          left: '3%',
          width: '94%',
          height: '1px',
          backgroundColor: 'primary.main',
        },
      }} >
        {/* floater swimmer */}
        <Box sx={{
          width: '15px',
          height: '15px',
          // borderRadius: '50%',
          position: 'relative',
          animationName: 'myAnimationFloat',
          animationDuration: '30s',
          animationIterationCount: 'infinite',
          '@keyframes myAnimationFloat': {
            "0%": {
              backgroundColor: 'transparent; left:4%; top:0px',
              transform: 'rotate(15deg)'
            },
            "10%": {
              backgroundColor: 'transparent; left:25%; top:-5px',
              transform: 'rotate(-10deg)'
            },
            "20%": {
              backgroundColor: 'transparent; left:50%; top:-7px',
              transform: 'rotate(25deg)'
            },
            "30%": {
              backgroundColor: 'transparent; left:60%; top:-3px',
              transform: 'rotate(-5deg)'
            },
            "40%": {
              backgroundColor: 'transparent; left:70%; top:0px',
              transform: 'rotate(12deg)'

            },
            "50%": {
              backgroundColor: 'transparent; left: 95%; top:-3px',
              transform: 'rotate(-12deg)'
            },
            "51%": {
              transform: 'scaleX(-1)'
            },
            "60%": {
              backgroundColor: 'transparent; left:80%; top:0px',
              transform: 'scaleX(-1) rotate(15deg)',
            },
            "70%": {
              backgroundColor: 'transparent; left:60%; top:-5px',
              transform: 'scaleX(-1) rotate(-15deg)'
            },
            "80%": {
              backgroundColor: 'transparent; left:50%; top:1px',
              transform: ' scaleX(-1) rotate(10deg)'
            },
            "90%": {
              backgroundColor: 'transparent; left:25%; top:-5px',
              transform: ' scaleX(-1) rotate(-22deg)'
            },
            "100%": {
              backgroundColor: 'transparent; left:0px; top:4px',
              transform: 'scaleX(-1)'
            }
          }
        }}>
          <PoolFloat />
        </Box>
        <Box sx={{
          '&::before': {
            content: '""', // left t line
            position: 'absolute',
            top: '29%',
            left: '3%',
            width: '95%',
            height: '10px',
            borderLeft: '1px solid #1976d2'
          },
        }}></Box>
        <Box sx={{
          '&::before': {
            content: '""', // right T line
            position: 'absolute',
            top: '29%',
            left: '97%',
            // width: '95%',
            height: '10px',
            borderLeft: '1px solid #1976d2'
          },
        }}></Box>
      </Box>

    </Box>
  )
}

export default AnimatedPool
