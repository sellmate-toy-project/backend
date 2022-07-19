import { makeStyles } from '@material-ui/core';
import { TabContext, TabPanel } from '@mui/lab';
import { Box, Button, List, Paper, Tab, Tabs } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Fragment, MouseEvent, SyntheticEvent, useState } from 'react';
import Item from './Item';
import ModalLayout from './ModalLayout';
import { RankingActionItem, RankingTitleItem } from './RankingItem';
const theme = createTheme({
	palette: {
		primary: {
			main: '#21CAFF',
		},
		secondary: {
			main: 'rgba(0, 0, 0, 0)',
		},
	},
});
const useStyles = makeStyles((theme) => ({
	list: {
		width: '100%',
		padding: '20px',
		boxSizing: 'border-box',
		display: 'flex',
		flexDirection: 'column',
		'& .floor': {
			height: '32px',
			textAlign: 'left',
			borderBottom: '1px solid #E0E0E0',
			margin: '0 16px 20px 0',
			color: '#181818',
			fontWeight: 600,
			fontSize: '14px',
		},
	},
	inline: {
		display: 'inline',
	},
	listImg: {
		width: '92px',
		height: '92px',
		marginTop: 0,
		marginRight: '16px',
	},
	itemImg: {
		width: '100%',
		height: '100%',
		borderRadius: 0,
	},
	paddingNone: {
		padding: '0 !important',
	},
	title: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: '20px',
	},
	spacing: {
		padding: '0 20px 20px',
	},

	button: {
		color: '#333F52 !important',
		'&:hover': {
			backgroundColor: 'transparent !important',
		},
	},
	itemsClass: {
		marginRight: '20px',
		'&:last-of-type': {
			marginRight: 0,
		},
		'& .ranking-text': {
			padding: '4px 20px',
			borderRadius: '4px',
			color: 'white',
		},
		'& .title-text': {
			fontSize: '12px',
		},
	},
	tab: {
		padding: '0 !important',
		width: '30px !important',
		height: '26px !important',
		minHeight: '0 !important',
		minWidth: '0 !important',
		marginRight: '20px !important',
		'&:last-of-type': {
			marginRight: '0 !important',
		},
	},
}));

export default function Ranking() {
	const classes = useStyles();
	const floorsRankingData = {
		'3F': [
			{
				img: '/static/images/avatar/3.jpg',
				title: '오레오 화이트크림 샌드위치 쿠키100g',
			},
			{
				img: '/static/images/avatar/3.jpg',
				title: '[농심] 포테토칩 오리지널 4번들',
			},
			{
				img: '/static/images/avatar/3.jpg',
				title: '[CJ] 맛밤 60g*4번들',
			},
		],
		'5F': [
			{
				img: '/static/images/avatar/3.jpg',
				title: '[크라운] 쿠크다스 케이크 154g',
			},
			{
				img: '/static/images/avatar/1.jpg',
				title: '[피코크] 초콜릿 샌드위치 비스킷 135g',
			},
			{
				img: '/static/images/avatar/3.jpg',
				title: '[라라스윗] 생우유 모나카 (140ml*4입)',
			},
		],
		'11F': [
			{
				img: '/static/images/avatar/1.jpg',
				title: '[피코크] 초콜릿 샌드위치 비스킷 135g',
			},
			{
				img: '/static/images/avatar/2.jpg',
				title: '[오리온] 후레쉬 베리',
			},
			{
				img: '/static/images/avatar/3.jpg',
				title: '[크라운] 쿠크다스 케이크 154g',
			},
		],
	};

	const [tabValue, setTabValue] = useState('snack');

	const handleChange = (event: SyntheticEvent, newValue: string) => {
		setTabValue(newValue);
	};
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};
	const handleClickOpen = () => {
		setOpen(true);
	};

	const [rangeValue, setRangeValue] = useState('all');
	const handleRangeChange = (
		event: MouseEvent<HTMLElement>,
		newValue: string
	) => {
		if (newValue !== null) {
			setRangeValue(newValue);
		}
	};
	const [floorValue, setFloorValue] = useState('3F');
	const [itemValue, setItemValue] = useState('과자');

  const itemOptions = [
		{ title: '과자', value: 'snack' },
		{ title: '음료', value: 'drink' },
	];
	const handleTitleChange = (
		event: MouseEvent<HTMLElement>,
		newValue: string
	) => {
    const value = event.target as HTMLButtonElement;
    if(itemOptions.some(v => v.title.includes(value.value))){
      setItemValue(value.value)
    } else {
      if (newValue !== null) {
        setFloorValue(newValue);
      }
    }
	};
	
	return (
		<TabContext value={tabValue}>
			<ThemeProvider theme={theme}>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
					}}>
					<div className={classes.title}>
						<span
							style={{
								fontWeight: 700,
								fontSize: '16px',
								marginRight: '24px',
							}}>
							랭킹
						</span>
						<Tabs
							value={tabValue}
							onChange={handleChange}
							variant='standard'
							style={{ minHeight: 0 }}
							textColor='primary'
							sx={{
								fontSize: '16px',
								'& .MuiTabs-indicator': {
									display: 'none',
								},
							}}>
							{itemOptions.map((floor, i) => (
								<Tab
									disableFocusRipple
									disableRipple
									key={i}
									className={classes.tab}
									label={floor.title}
									value={floor.value}
									sx={{ fontSize: '16px !important', fontWeight: '700' }}
								/>
							))}
						</Tabs>
					</div>
					<Button
						variant='text'
						size='small'
						className={[classes.paddingNone, classes.button].join(' ')}
						onClick={handleClickOpen}
						disableFocusRipple
						disableRipple
						sx={{
							fontWeight: '600',
							fontSize: 14,
						}}>
						+ 더보기
					</Button>
					<ModalLayout
						onClose={handleClose}
						open={open}
						title={'랭킹'}
            titleChildren={
							<RankingTitleItem
              onChange={(event: MouseEvent<HTMLElement>, newValue: string) =>
                  handleTitleChange(event, newValue)
								}
								floorValue={floorValue}
                itemValue={itemValue}
							/>
						}
						actionChildren={
							<RankingActionItem
              onChange={(event: MouseEvent<HTMLElement>, newValue: string) =>
									handleRangeChange(event, newValue)
								}
								rangeValue={rangeValue}
							/>
						}
            >
						{tabValue === 'snack' ? (
							<Paper elevation={0}>snack</Paper>
						) : (
							<Paper elevation={0}>drink</Paper>
						)}
					</ModalLayout>
				</Box>
			</ThemeProvider>
			<Fragment>
				{itemOptions.map((item, idx) => (
					<TabPanel
						key={idx}
						value={item.value}
						sx={{ padding: 0, display: 'flex' }}>
						{Object.entries(floorsRankingData).map(
							([floor, valueArr], index) => (
								<List className={classes.list} disablePadding key={index}>
									<div className='floor'>{floor}</div>
									{valueArr.map((items, idx) => (
										<Item
											title={items.title}
											img={{
												src: items.img,
												style: {
													width: '80px',
													height: '80px',
													borderRadius: '8px',
												},
											}}
											text={{
												display: false,
											}}
											rank={{ display: true, content: idx + 1 }}
											key={idx}
											itemsClass={classes.itemsClass}
										/>
									))}
								</List>
							)
						)}
					</TabPanel>
				))}
			</Fragment>
		</TabContext>
	);
}
