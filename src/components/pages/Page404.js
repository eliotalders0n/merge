import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Container } from '@mui/material';
// components
import { MotionContainer, varBounceIn } from '../components/animate';
import Page from '../components/Page';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

   {/* <div style={{flexDirection:"row", display:"flex", marginBottom:20,alignItems:"center", justifyContent:"space-evenly"}}>
     <Typography variant="overline" sx={{ color: 'text.secondary',   }}>Month</Typography>
     {months.map((y, index)=>(
        <Button
        style={{flex:1, marginLeft:10, marginRight:10}}
        fullWidth={false}
          variant={month === index ? "contained" : "outlined"}
           onClick={()=>setmonth(index)}
             >
       {y} 
        </Button> 
      ))}
      </div> */}
      
{/* <div style={{flexDirection:"row",marginBottom:20, display:"flex", alignItems:"center", justifyContent:"space-evenly"}}>
<Typography variant="overline" sx={{ color: 'text.secondary',   }}>Platform</Typography>
      {platforms.map((y)=>(
        <Button
        style={{flex:1, marginLeft:10, marginRight:10}}
        fullWidth={false}
          variant={platform === y ? "contained" : "outlined"}
           onClick={()=>setplatform(y)}
             >
       {y}
        </Button> 
      ))} 
    </div> */}
   
// const groupedByChannel2 = regions.reduce((acc, region) => {
//   region.sales_channels.forEach(channel => {
//      const channelName = channel.channel;
//     const channelData = acc[channelName] || { month_to_date_target_total: 0, regions: [] };
  
//     channelData.month_to_date_target_total += channel.month_to_date_target;

//     channelData.regions.push(region.name);
//     acc[channelName] = channelData;
//   });
//   return acc;
// }, {});
// const groupedByChannelArray2 = Object.entries(groupedByChannel2);
// setCmtdt(groupedByChannelArray2)
// ----------------------------------------------------------------------

// <div style={{display:"flex", flexDirection:"row"}}>
// {regions.map((r)=>(
 
//   <div style={{flex:1}}>

//       <Typography variant="overline" sx={{ color: 'text.secondary',   }}>Region - {r.name}</p>
     
//       <br/>
//       <Typography variant="overline" sx={{ color: 'text.secondary',   }}>Sales Channels</b>
//         {r.sales_channels.map((sc)=>(
//           <div>
//           <p  style={{flex:1}}>{sc.channel.replace("_", " ")} :
//           <span style={{flex:1,
//             color : Math.round(((sc.weekly_sales.map(i=>i.sales).reduce((a,b) =>a+b))/sc.month_to_date_target)*100) > 75 ? "green" : "red"
//             }}> Perf. % : <Typography variant="overline" sx={{ color: 'text.secondary',   }}>{(((sc.weekly_sales.map(i=>i.sales).reduce((a,b) =>a+b))/sc.month_to_date_target)*100).toFixed(1)}%</b></span>
//          </p>
//           <div style={{display:"flex", flexDirection:"row"}}>
           
    
//             <p  style={{flex:1}}>Monthly Target : <Typography variant="overline" sx={{ color: 'text.secondary',   }}>{sc.monthly_target}</b></p>
//             <p  style={{flex:1}}>MTD Target : <Typography variant="overline" sx={{ color: 'text.secondary',   }}>{(sc.month_to_date_target).toFixed(1)}</b></p>
//             <p  style={{flex:1}}>MTD Actual <Typography variant="overline" sx={{ color: 'text.secondary',   }}>{sc.weekly_sales.map(i=>i.sales).reduce((a,b) =>a+b)}</b></p>
//             </div>
           
//          <div style={{display:"flex", flexDirection:"row"}}>
//           {sc.weekly_sales.map((ws)=>(
//                   <div style={{flex:1}}>
//                     <Typography variant="overline" sx={{ color: 'text.secondary',   }}>{ws.week.replace("_", " ")} Sales : <Typography variant="overline" sx={{ color: 'text.secondary',   }}>{ws.sales}</b></p>
//                   </div>
//                 ))}
//                 </div> 
                
//                 <br/>
//             </div>
//         ))}
//   </div>
 
// ))}
// </div>


{/* <div>
 
<div style={{flexDirection:"row", display:"flex"}}>
<div style={{flex:4}}>
<div style={{display:"flex", flexDirection:"row"}}>
<b style={{flex:1}}>Channels</b>
<b style={{flex:1}}>Monthly Target</b>
<b style={{flex:1}}>MTD Target</b>
<b style={{flex:1}}>MTD Actual</b>
<b style={{flex:1}}>Perf. %</b>

</div>
{everthing.length > 0 && everthing.map((t)=>(
<div style={{display:"flex", flexDirection:"row"}}>
<p style={{flex:1}}>{(t.name).replace("_", " ")}</p> 
<p  style={{flex:1}}>{parseInt(t.month_to_date_target_total)}</p> 
<p  style={{flex:1}}>{parseInt(t.monthly_target_total)}</p>
<p  style={{flex:1}}>{parseInt(t.total_sales)}</p>
<p  style={{flex:1}}>{((parseInt(t.total_sales)/parseInt(t.month_to_date_target_total))*100).toFixed(1)}</p>
</div>
))}
</div>
</div>  

</div>
<br/><br/> */}

 
 
 // const trya = ()=>{ 
 
 //   const groupedByChannel = regions.reduce((acc, region) => {
 //     region.sales_channels.forEach((channel) => {
 //       if (!acc[channel.channel]) {
 //         acc[channel.channel] = {
 //           name: channel.channel,
 //           total_sales: 0,
 //         };
 //       }
 //       const weeklySales = channel.weekly_sales.reduce((sum, week) => sum + week.sales, 0);
 //       acc[channel.channel].total_sales += weeklySales;
 //     });
 //     return acc;
 //   }, {});
   
 //   const groupedByChannelArray = Object.entries(groupedByChannel);
 //   settotals(groupedByChannelArray)
 
 //   const groupedByChannel3 = regions.reduce((acc, region) => {
 //     region.sales_channels.forEach(channel => {
 //       const channelName = channel.channel;
 //      const channelData = acc[channelName] || { month_to_date_target_total: 0, monthly_target_total : 0, regions: [] };
    
 //      channelData.month_to_date_target_total += channel.monthly_target;
 //      channelData.monthly_target_total += channel.month_to_date_target;
 //      channelData.regions.push(region.name);
 //      acc[channelName] = channelData;
 //    });
 //    return acc;
 //   }, {});
 //   const groupedByChannelArray3 = Object.entries(groupedByChannel3);
 //   setCmt(groupedByChannelArray3) 
   
 
 //   const combinedGrouped = {};
 //   for (const channelName in groupedByChannel) {
 //     if (groupedByChannel.hasOwnProperty(channelName)) {
 //       const channel = groupedByChannel[channelName];
 //      const channelData = groupedByChannel3[channelName] || { month_to_date_target_total: 0, monthly_target_total : 0, regions: [] };
 //       combinedGrouped[channelName] = { ...channelData,...channel };
 //     }
 //   }
 //   const eve = Object.values(combinedGrouped)
 //   setEverything(eve)
 //   console.log(eve)
 // }
  
export default function Page404() {
  return (
    <RootStyle title="404 Page Not Found ">
      <Container>
        <MotionContainer initial="initial" open>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <motion.div variants={varBounceIn}>
              <Typography variant="h3" paragraph>
                Sorry, page not found!
              </Typography>
            </motion.div>
            <Typography sx={{ color: 'text.secondary' }}>
              Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL?
              Be sure to check your spelling.
            </Typography>

            <motion.div variants={varBounceIn}>
              <Box
                component="img"
                src="/static/illustrations/illustration_404.svg"
                sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
              />
            </motion.div>

            <Button to="/" size="large" variant="contained" component={RouterLink}>
              Go to Home
            </Button>
          </Box>
        </MotionContainer>
      </Container>
    </RootStyle>
  );
}
