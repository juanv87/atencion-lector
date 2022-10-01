import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FirebaseAuth } from "../lib/firebase/firebase";

export const useRedirectNonUsers = () => {
  const router = useRouter();
  useEffect(() => {
    // alert(status);
    // status !== "authenticated" && router.push("/");
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return router.push("/");
    });
  }, []);
};
