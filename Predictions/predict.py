from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
from sklearn.model_selection import train_test_split
import pandas as pd
# Load the data from the uploaded Excel file
file_path = "C:/Users/natha/Downloads/Copy of unmatched_data_gpt2_NZbias.xlsx"
data = pd.read_excel(file_path)

# Display the first few rows of the data to understand its structure
data.head()


# Encode the Annotator values
label_encoder = LabelEncoder()
data['Annotator_encoded'] = label_encoder.fit_transform(data['Annotator'])

# Prepare feature matrix X and target vector y
X = data[['regard_pos', 'regard_neg', 'regard_neu', 'regard_oth']]
y = data['Annotator_encoded']

print(X)
# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Fit a logistic regression model
log_reg = LogisticRegression(max_iter=2000)
log_reg.fit(X_train, y_train)


print(pd.DataFrame(zip(X.columns, log_reg.coef_)))
# Predict on the test set
y_pred = log_reg.predict(X_test)

# Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
class_report = classification_report(y_test, y_pred, target_names=label_encoder.classes_)

print(accuracy)
print(class_report)
