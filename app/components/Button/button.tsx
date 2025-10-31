import { Button, StyleSheet } from "react-native";

const CButton: React.FC<{ title: string, onPress: () => void }> = ({ title, onPress }) => {
  return (
    <Button
        title={title}
        onPress={onPress} />
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
  },
});

export default CButton;
