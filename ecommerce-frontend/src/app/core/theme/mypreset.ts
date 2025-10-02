import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50:  '#f2f8ff', 
            100: '#e0f0ff',
            200: '#b9dbff',
            300: '#92c5ff',
            400: '#73b0ff',
            500: '#5E9CFF', 
            600: '#3e7fd9',
            700: '#2f62b3',
            800: '#1f447d',
            900: '#0f2240',
            950: '#070f1e'
        },
        accent: {
            500: '#FF7F50'
        }
    }
});

export default MyPreset;