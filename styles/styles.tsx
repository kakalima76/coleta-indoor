import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: "20%",
  },
  containerSucesso: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: "20%",
    marginLeft: 20,
  },
  scrollView: {
    width: "100%",
  },
  scrollContent: {
    alignItems: "center",
    paddingBottom: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "red",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  picker: {
    height: 50,
    width: 200,
  },
  selectedText: {
    marginTop: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 20,
    color: "#333",
  },
  titleColeta: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    color: "green",
    marginBottom: 25,
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    color: "#666",
    marginVertical: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    backgroundColor: "#ccc",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 16,
  },
  sucessMessage: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    color: "green",
    marginBottom: 25,
  },
  cadastro: {
    marginTop: 20
  }
});

export default styles;
