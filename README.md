# Triple DES Encryption React App

A modern React application that implements Triple DES encryption for text and files (images and videos).

## Features

- Text encryption/decryption using Triple DES algorithm
- File encryption support for:
  - Images
  - Videos
- Clean and responsive user interface
- Real-time encryption/decryption
- Modern gradient design with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/long-vux/triple-des-reactjs.git

2. Navigate to project directory:
```bash
cd triple-des-reactjs

3. Install dependencies:
```bash
npm install

4. Start the development server:
```bash
npm start

The application will open in your default browser at `http://localhost:3000`

## Usage

1. Select input type from the dropdown menu:
   - Text
   - Image
   - Video

2. For text encryption:
   - Enter your text in the input field
   - Provide an encryption key or click the random generate key button
   - Click encrypt/decrypt buttons

3. For file encryption:
   - Upload your file using the file input
   - Provide an encryption key or click the random generate key button
   - Process the file using encrypt/decrypt buttons

## Tech Stack

- React.js
- Tailwind CSS
- Triple DES encryption algorithm ( crypto-js )
- File handling APIs

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Acknowledgments

- Create React App for the initial project setup
- Tailwind CSS for the styling system
- Triple DES encryption implementation
