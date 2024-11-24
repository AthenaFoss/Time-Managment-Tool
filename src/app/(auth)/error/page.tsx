import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

export default function AuthErrorPage() {
  return (
    <div className="flex items-center justify-center min-h-[90vh]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-red-500" />
            <CardTitle className="text-2xl font-bold text-red-500">
              Authentication Error
            </CardTitle>
          </div>
          <CardDescription>
            An error occurred during authentication.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            Please try again or contact support if the problem persists.
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" asChild>
            <Link href="/login">Return to Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
