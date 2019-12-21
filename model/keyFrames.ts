// Like CSS keyframes: Describes scaling at certain frames of the animation
// currently a keyFrame is a percentage
export interface KeyFrames {
  [keyFrame: number]: number
}

export interface KeyFrame {
  keyFrame: number,
  value: number
}
