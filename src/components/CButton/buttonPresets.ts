import { ThemeColorsProps } from '../../theme/theme';
import { CTouchableOpacityBoxProps } from '../CBox/CBox';
import { ButtonPreset } from './CButton';

interface ButtonUI {
  container: CTouchableOpacityBoxProps;
  content: ThemeColorsProps;
}

export const buttonPresets: Record<
  ButtonPreset,
  {
    default: ButtonUI;
    disabled: ButtonUI;
  }
> = {
  primary: {
    default: {
      container: {
        backgroundColor: 'primary',
      },
      content: 'primaryContrast',
    },
    disabled: {
      container: {
        backgroundColor: 'gray4',
      },
      content: 'gray2',
    },
  },
  outline: {
    default: {
      container: {
        borderWidth: 2,
        borderColor: 'primary',
      },
      content: 'primary',
    },
    disabled: {
      container: {
        borderWidth: 2,
        borderColor: 'gray4',
      },
      content: 'gray2',
    },
  },
};