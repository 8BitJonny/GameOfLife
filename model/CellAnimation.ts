import Vector from "./vector";
import { KeyFrames, KeyFrame }from "./keyFrames";
import { lerp } from "../utils/index";

export default class CellSizeAnimation {
  keyFrames: KeyFrames;
  animationTime: number;
  timeProgress: number;
  done: boolean;
  constructor(keyFrames: KeyFrames, animationTime = 500) {
    this.animationTime = animationTime;
    this.timeProgress = 0;
    this.keyFrames = keyFrames;
    this.done = false
  }

  calculateSize(timePassed: number, baseSize: Vector): Vector {
    this.timeProgress += timePassed;
    if (this.timeProgress > this.animationTime) this.done = true;

    let currentKeyFrame = (this.timeProgress / this.animationTime) * 100;
    let applicableKeyFrameRange = this._getKeyFrameRangeToApply(currentKeyFrame);

    if (!applicableKeyFrameRange) return baseSize;

    let relativeDistance = this._getRelativeDistanceInRange(applicableKeyFrameRange["0"].keyFrame, applicableKeyFrameRange["1"].keyFrame, currentKeyFrame);
    let size = lerp(applicableKeyFrameRange["0"].value, applicableKeyFrameRange["1"].value, relativeDistance) / 100;

    return baseSize.mul(size);
  }

  _getKeyFrameRangeToApply(currentKeyFrame: number): {0: KeyFrame, 1: KeyFrame} | undefined {
    if (currentKeyFrame < 0 || currentKeyFrame > 100) return undefined;

    let lastKeyFrame: KeyFrame | undefined = undefined;
    let matchingKeyFrame: {0: KeyFrame, 1: KeyFrame} | undefined = undefined;

    this._forEachObjectProperty(this.keyFrames, (keyFrame: number, value: number) => {
      if (lastKeyFrame !== undefined) {
        if (this._lastKeyFramePairContainsCurrentKeyFrame(lastKeyFrame.keyFrame, keyFrame, currentKeyFrame)) {
          matchingKeyFrame = {0: lastKeyFrame, 1: {keyFrame, value}};
        }

      }
      lastKeyFrame = { keyFrame, value };
    });

    return matchingKeyFrame;
  }

  _forEachObjectProperty<T>(obj: {[key: number]: T}, fn: (key: number, prop: T) => void) {
    for (let prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        fn(Number(prop), obj[prop])
      }
    }
  }

  _lastKeyFramePairContainsCurrentKeyFrame(firstKeyFrame: number, secondKeyFrame: number, currentKeyFrame: number) {
    return firstKeyFrame <= currentKeyFrame && secondKeyFrame >= currentKeyFrame;
  }

  _getRelativeDistanceInRange(bottomEndRange: number, topEndRange: number, currentValue: number) {
    let currentDistance = currentValue - bottomEndRange;
    let maxDistance = topEndRange - bottomEndRange;
    let relativeDistance = currentDistance/maxDistance;

    if( isNaN(relativeDistance) ) relativeDistance = 0;
    if(relativeDistance === -Infinity) relativeDistance = 0;
    if(relativeDistance === Infinity) relativeDistance = 0;
    return relativeDistance
  }
}
