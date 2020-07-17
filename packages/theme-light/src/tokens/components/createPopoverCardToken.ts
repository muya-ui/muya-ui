import { IPopoverCardToken, IThemeWithoutComponents } from '../../interfaces';

export default function createPopoverCardToken({
  size,
  spacing,
}: IThemeWithoutComponents): IPopoverCardToken {
  const {
    spec: { borderRadius },
  } = size;
  return {
    card: {
      paddingHorizontal: spacing.spec.s6,
      paddingVertical: spacing.spec.s6,
      borderRadius: borderRadius.s2,
    },
    title: {
      marginBottom: spacing.spec.s1,
      level: 6,
    },
    text: {
      type: 'assistant',
    },
    actions: {
      marginTop: spacing.spec.s5,
      marginLeft: spacing.spec.s4,
    },
  };
}
