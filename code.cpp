#include <iostream>
#include <fstream>
#include <vector>
using namespace std;

struct Student {
    string name;
    float cgpa;
    string skills;
    int projects;
    string eligibility;
};

string checkEligibility(float cgpa, int projects) {
    return (cgpa >= 7.5 && projects >= 2) ? "Eligible" : "Not Eligible";
}

int main() {
    ofstream file("students.txt");
    if (!file) {
        cerr << "Error opening file!" << endl;
        return 1;
    }

    int n;
    cout << "Enter number of students: ";
    cin >> n;
    cin.ignore();

    vector<Student> students;

    for (int i = 0; i < n; ++i) {
        Student s;
        cout << "\nEnter name of student " << (i + 1) << ": ";
        getline(cin, s.name);
        cout << "Enter CGPA: ";
        cin >> s.cgpa;
        cin.ignore();
        cout << "Enter skills (comma-separated): ";
        getline(cin, s.skills);
        cout << "Enter number of projects: ";
        cin >> s.projects;
        cin.ignore();
        s.eligibility = checkEligibility(s.cgpa, s.projects);
        students.push_back(s);
    }

    for (const auto& s : students) {
        file << s.name << "\n"
             << s.cgpa << "\n"
             << s.skills << "\n"
             << s.projects << "\n"
             << s.eligibility << "\n";
    }

    file.close();
    cout << "\nStudent data written to students.txt\n";
    return 0;
}
