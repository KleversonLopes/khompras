import styles from "@/app/styles/Styles";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React from "react";

interface BottomSheetProps {
  children: React.ReactNode;
  style?: object;
  index: number | -1;
  snapPoints: string[];
  onClose?: () => void;
}

const BottomSheetX: React.FC<BottomSheetProps> = ({
  children,
  style,
  index,
  snapPoints,
  onClose,
}) => {
  return (
    <BottomSheet
      index={index}
      snapPoints={snapPoints}
      keyboardBehavior="interactive"
      enablePanDownToClose={false}
      onClose={onClose}
    >
      <BottomSheetView
        style={[
          styles.content,
          style
        ]}
      >
          { children }
      </BottomSheetView>
    </BottomSheet>
  );
};

export default BottomSheetX;
