"use client";
export default function Footer() {
    return (
        <>
            <footer className="text-center mt-4 text-muted small">
                <p className="text-muted small mb-2">
                    By choosing your age, you agree with{" "}
                    <a href="/terms">Terms and Conditions</a>,{" "}
                    <a href="/privacy">Privacy Policy</a>,{" "}
                    <a href="/subscription">Subscription Terms</a>
                </p>
                <p>&copy; 2024 ADM Digital. All Rights Reserved.</p>
            </footer>
        </>
    );
}