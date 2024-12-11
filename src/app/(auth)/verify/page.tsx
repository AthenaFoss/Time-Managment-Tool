"use client"

import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Loader2,
  Mail,
} from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { verifyToken } from "@/actions/auth/verifyToken"

export default function Verify() {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing token!")
      return
    }
    verifyToken(token)
      .then((data) => {
        setSuccess(data.success)
        setError(data.error)
      })
      .catch(() => {
        setError("Something went wrong!")
      })
  }, [token])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <div className="flex justify-center items-center h-screen w-[90%]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Mail className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl font-bold text-primary">
              Email Verification
            </CardTitle>
          </div>
          <CardDescription>
            Verifying your email address, please wait...
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className={`flex items-center justify-center p-3 gap-1 border rounded-md ${
              error
                ? "bg-red-50 border-red-200"
                : success
                  ? "bg-green-50 border-green-200"
                  : "bg-amber-50 border-amber-200"
            }`}
          >
            {error ? (
              <>
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </>
            ) : success ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <p className="text-sm text-green-800">{success}</p>
              </>
            ) : (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <p className="text-sm">Verifying...</p>
              </>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          {/* //* NOTE: update when we have support email*/}
          <p className="text-sm text-muted-foreground">
            Need help? {""}
            <Link href="" className="text-primary hover:underline">
              Contact support
            </Link>
          </p>
          <Button asChild size="sm">
            <Link href="/login" className="flex items-center gap-1">
              Continue to Login
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
