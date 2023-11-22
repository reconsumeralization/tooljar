# EmailModel Documentation

## Class: EmailModel

The `EmailModel` class represents an email and provides methods to send and retrieve emails.

### Properties

- `to: string`: The email address of the recipient.
- `subject: string`: The subject of the email.
- `message: string`: The content of the email.

### Constructor

#### `constructor(data: EmailData)`

Creates a new instance of the `EmailModel` class.

##### Parameters

- `data: EmailData`: An object containing the email data.
  - `to: string`: The email address of the recipient.
  - `subject: string`: The subject of the email.
  - `message: string`: The content of the email.

### Methods

#### `send(): Promise<void>`

Sends the email using the configured email service.

##### Throws

- `Error`: If there is an issue with sending the email.

#### `static find(): Promise<EmailData[]>`

Retrieves all sent emails.

##### Returns

- `Promise<EmailData[]>`: A promise that resolves to an array of `EmailData` objects representing the sent emails.

## Interface: EmailData

An interface representing the data required to send an email.

### Properties

- `to: string`: The email address of the recipient.
- `subject: string`: The subject of the email.
- `message: string`: The content of the email.
