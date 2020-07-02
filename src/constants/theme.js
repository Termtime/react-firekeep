import { makeStyles } from '@material-ui/core/styles';

const InputStyles = {
    darkInput:{
        marginBottom: '50px',
        '& label': {
            color:'white'
        },
        '& .MuiInput-input':{
            color:'white'
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: 'white',
        },
        '& label.Mui-focused': {
            color: 'dodgerblue',
        },
        '& .MuiInput-underline:after': {
        borderBottomColor: 'dodgerblue',
        },
        backgroundColor: '#222',
    },
    darkInput_M:{
        marginBottom: '10px',
        '& label': {
            color:'white'
        },
        '& .MuiInput-input':{
            color:'white'
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: 'white',
        },
        '& label.Mui-focused': {
            color: 'dodgerblue',
        },
        '& .MuiInput-underline:after': {
        borderBottomColor: 'dodgerblue',
        },
        backgroundColor: '#222',
    },
    darkNoteTitle:{
        width: '90%',
        padding:'0px',
        margin: '0px',
        marginTop: '-30px',
        '& label': {
            color:'white'
        },
        '& .MuiInput-input':{
            color:'white',
            fontSize:'16pt',
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: 'white',
        },
        '& label.Mui-focused': {
            color: 'dodgerblue',
        },
        '& .MuiInput-underline:after': {
        borderBottomColor: 'dodgerblue',
        },
        backgroundColor: '#222',
    },
    darkNoteTitle_M:{
        width: '80%',
        padding:'0px',
        margng: '0px',
        marginTop: '-40px',
        '& label': {
            color:'white'
        },
        '& .MuiInput-input':{
            color:'white',
            fontSize:'16pt',
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: 'white',
        },
        '& label.Mui-focused': {
            color: 'dodgerblue',
        },
        '& .MuiInput-underline:after': {
        borderBottomColor: 'dodgerblue',
        },
    },
    darkNoteInput: {
        width: '100%',
        padding:'0px',
        margng: '0px',
        '& label': {
            color:'white'
        },
        '& .MuiInput-input':{
            color:'white'
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: 'white',
        },
        '& label.Mui-focused': {
            color: 'dodgerblue',
        },
        '& .MuiInput-underline:after': {
        borderBottomColor: 'dodgerblue',
        },
        backgroundColor: '#222',
    },
    darkNoteInput_M:{
        width: '100%',
        padding:'0px',
        margng: '0px',
        '& label': {
            color:'white'
        },
        '& .MuiInput-input':{
            color:'white'
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: 'white',
        },
        '& label.Mui-focused': {
            color: 'dodgerblue',
        },
        '& .MuiInput-underline:after': {
        borderBottomColor: 'dodgerblue',
        },
    },
    loginButton: {
        color: 'white',
        background:'dodgerblue',
        '&:hover':{
            background:'royalblue'
        },
        width:'200px',
        marginBottom:'20px'
    },
    loginButton_M: {
        color: 'white',
        background:'dodgerblue',
        '&:hover':{
            background:'royalblue'
        },
        width:'100%',
        marginBottom:'20px'
    },
    disabledBtn:{
        backgroundColor:'grey'
    },
    btn:{
        background: 'steelblue',
        color:'white',
        textTransform: 'none',
        '&:hover': {
            background: '#315a7d'
        }
    },
}

const MenuStyles = {
    menuButton: {
        color:'white'
    },
    firstMenuItem:{
        display: 'flex',
        justifyContent:'center',
        borderTop:'1px solid white',
        borderBottom: '1px solid white',
        fontSize: '10pt',
        color:'white',
    },
    consecutiveMenuItem:{
        display: 'flex',
        justifyContent:'center',
        borderBottom:'1px solid white',
        fontSize: '10pt',
        color: 'white',
    },
}

const CardStyles = {
    titlePaper: {
        background: '#1d1e1e',
        color: 'white',
        padding: '5px 20px 5px 20px',
        width: '70%',
    },

    subtitlePaper:{
        background: '#272828',
        color:'white',
        flexWrap:'wrap',
        padding: '10px 20px 10px 20px',
        marginRight:'20px',
        marginTop:'10px',
    },
    flexContainer: {
        display:'flex',
    },
    loginCard:{
        width:'380px',
        height:'70%',
        textAlign:'center',
        background: '#222',
        color: 'white',
        padding: '5px 20px 5px 20px',
        margin:'20px',
        marginTop:'100px',
    },
    loginCard_M:{
        width:'70%',
        height:'50%',
        textAlign:'center',
        background: '#222',
        color: 'white',
        padding: '5px 20px 5px 20px',
        margin:'40px',
    },
    notePaper:{
        border:'0.1px solid rgba(230,230,230,0.3)',
        borderRadius:'10px',
        boxShadow:'0px 0px 5px 0px rgba(245,233,245,0.1)',
        background: '#222',
        color: 'white',
        padding:'10px',
        marginTop:'20px',
    },
    notePaper_M:{
        border:'0.1px solid rgba(230,230,230,0.3)',
        borderRadius:'15px',
        boxShadow:'0px 0px 5px 0px rgba(245,233,245,0.1)',
        background: '#222',
        color: 'white',
        padding:'0px,'
    },
}

const DrawerStyles = {
    drawerPaper: {
        backgroundColor:'#131414',
        color: 'white',
    },
}
export const HookTheme = makeStyles((theme) => ({
    ...CardStyles,
    ...DrawerStyles,
    ...InputStyles,
    ...MenuStyles,
    body: {
        background: '#131414',
        color: 'white',
    },
    block:{
        display:'block'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },
}));


